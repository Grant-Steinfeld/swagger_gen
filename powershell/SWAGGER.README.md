# Swagger/OpenAPI Generator Script

This directory contains `new-swagger.ps1`, a PowerShell script that generates an OpenAPI (Swagger) YAML specification for the Pet Store API.

## What does `new-swagger.ps1` do?

- **Scans your Express route file** (`src/routes/pets.ts`) to extract all API endpoints (GET, POST, PUT, PATCH, etc.).
- **Reads your Joi validation schema** from (`src/middlewares/validation.ts`) to infer the data models, required fields, and validation rules.
- **Generates an OpenAPI 3.0 YAML file** (`openapi.yaml`) describing your API endpoints, request/response schemas, validation, and error responses.
- **Includes example payloads** for each pet type (dog, cat, fish) with characteristic descriptions.

## How to use

1. Open a terminal in the `powershell` directory.
2. Run the script with PowerShell:
   ```sh
   pwsh ./new-swagger.ps1
   ```
   This will create or overwrite `openapi.yaml` in the same directory.

## Output

- The generated `openapi.yaml` will contain:
  - API metadata (title, version, description)
  - All detected routes and HTTP methods
  - Request body schemas and validation
  - Example payloads for each pet type
  - Error response documentation
  - The Pet model schema with required fields and descriptions

## Notes

- The script is a starting point and may require manual refinement for a complete, production-ready OpenAPI spec.
- Make sure your route and validation files follow the expected structure for best results.

---
```// filepath: /Users/grantsteinfeld/Documents/dev/swagger/route_gen/lib/powershell/SWAGGER.README.md
# Swagger/OpenAPI Generator Script

This directory contains `new-swagger.ps1`, a PowerShell script that generates an OpenAPI (Swagger) YAML specification for the Pet Store API.

## What does `new-swagger.ps1` do?

- **Scans your Express route file** (`src/routes/pets.ts`) to extract all API endpoints (GET, POST, PUT, PATCH, etc.).
- **Reads your Joi validation schema** from (`src/middlewares/validation.ts`) to infer the data models, required fields, and validation rules.
- **Generates an OpenAPI 3.0 YAML file** (`openapi.yaml`) describing your API endpoints, request/response schemas, validation, and error responses.
- **Includes example payloads** for each pet type (dog, cat, fish) with characteristic descriptions.

## How to use

1. Open a terminal in the `powershell` directory.
2. Run the script with PowerShell:
   ```sh
   pwsh ./new-swagger.ps1
   ```
   This will create or overwrite `openapi.yaml` in the same directory.

## Output

- The generated `openapi.yaml` will contain:
  - API metadata (title, version, description)
  - All detected routes and HTTP methods
  - Request body schemas and validation
  - Example payloads for each pet type
  - Error response documentation
  - The Pet model schema with required fields and descriptions

## Notes

- The script is a starting point and may require manual refinement for a complete, production-ready OpenAPI spec.
- Make sure your route and validation files follow the expected structure for best results.

---
