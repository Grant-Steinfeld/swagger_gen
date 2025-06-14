# extract-routes.ps1
# PowerShell script to extract Express route definitions from src/routes/pets.ts

$routesFile = "../src/routes/pets.ts"

if (!(Test-Path $routesFile)) {
    Write-Error "File not found: $routesFile"
    exit 1
}

# Regex to match Express route definitions (e.g., router.get('/path', ...))
$routePattern = '(router|app)\.(get|post|put|patch|delete)\s*\(\s*["'']([^"'']+)["'']'

Get-Content $routesFile | ForEach-Object {
    if ($_ -match $routePattern) {
        $method = $matches[2].ToUpper()
        $path = $matches[3]
        Write-Output "$method $path"
    }
}