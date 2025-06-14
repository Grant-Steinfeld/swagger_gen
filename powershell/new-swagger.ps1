<#
.SYNOPSIS
    Generates a basic OpenAPI YAML spec for the Express pet store API by extracting routes, models, validation, and error responses.

.DESCRIPTION
    This script scans the pets route file and validation middleware, then generates an OpenAPI 3.0 YAML file describing endpoints, models, validation, and error responses.
    The output is written to openapi.yaml in the current directory.

.NOTES
    This script is a starting point and may require manual refinement for a complete OpenAPI spec.
#>

$routesFile = "../src/routes/pets.ts"
$validationFile = "../src/middlewares/validation.ts"
$outputFile = "openapi.yaml"

if (!(Test-Path $routesFile)) {
  Write-Error "Routes file not found: $routesFile"
  exit 1
}
if (!(Test-Path $validationFile)) {
  Write-Error "Validation file not found: $validationFile"
  exit 1
}

# Extract route definitions
$routePattern = '(router|app)\.(get|post|put|patch|delete)\s*\(\s*["'']([^"'']+)["'']'
$routes = @()
Get-Content $routesFile | ForEach-Object {
  if ($_ -match $routePattern) {
    $routes += @{
      method = $matches[2].ToLower()
      path   = $matches[3]
    }
  }
}

# Extract model schema from validation middleware
$petSchemaLines = @()
$inPetSchema = $false
Get-Content $validationFile | ForEach-Object {
  if ($_ -match 'const petSchema = Joi\.object\(') { $inPetSchema = $true }
  elseif ($inPetSchema -and $_ -match '\);') { $inPetSchema = $false }
  elseif ($inPetSchema) { $petSchemaLines += $_.Trim() }
}

# Parse petSchema lines into OpenAPI properties (simple parser)
$properties = @()
$required = @()
foreach ($line in $petSchemaLines) {
  if ($line -match '^(\w+):\s*Joi\.string\(\)(\.valid\(([^)]+)\))?(\.required\(\))?') {
    $name = $matches[1]
    $enum = $matches[3] -replace '[\s'']', '' -split ',' | Where-Object { $_ }
    $isRequired = $matches[4]
    $prop = "      ${name}:"
    $prop += "`n        type: string"
    if ($enum) {
      $prop += "`n        enum: [$(($enum -join ', '))]"
    }
    $properties += $prop
    if ($isRequired) { $required += $name }
  }
  elseif ($line -match '^(\w+):\s*Joi\.number\(\)(\.min\([^)]+\))?(\.required\(\))?') {
    $name = $matches[1]
    $isRequired = $matches[3]
    $properties += "      ${name}:`n        type: number"
    if ($isRequired) { $required += $name }
  }
}

# Compose OpenAPI YAML
$yaml = @"
openapi: 3.0.0
info:
  title: Pet Store API
  version: 1.0.0
  description: API for African Dogs, Cats, and Tropical Fish inventory with validation.
servers:
  - url: http://localhost:3000/api
paths:
"@

foreach ($route in $routes) {
  $yaml += @"
  ${($route.path)}:
    ${($route.method)}:
      summary: ${($route.method).ToUpper()} ${($route.path)}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              `"$ref`: '#/components/schemas/Pet'`
      responses:
        '200':
          description: Success
        '400':
          description: Validation error
        '500':
          description: Internal server error
"@
}

$yaml += @"
components:
  schemas:
    Pet:
      type: object
      required:
$(($required | ForEach-Object { "        - $_" }) -join "`n")
      properties:
$(($properties -join "`n"))
"@

Set-Content -Path $outputFile -Value $yaml
Write-Output "OpenAPI spec generated at $outputFile"
# This script generates a basic OpenAPI YAML spec for the Express pet store API by extracting routes, models, validation, and error responses.
# The output is written to openapi.yaml in the current directory.
# This script is a starting point and may require manual refinement for a complete OpenAPI spec.