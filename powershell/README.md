# PowerShell Route Extractor

This directory contains `extract-routes.ps1`, a PowerShell script for extracting Express route definitions from the `src/routes/pets.ts` file.

## Purpose

The script scans the `src/routes/pets.ts` file and extracts all Express route definitions (like `router.get('/path', ...)`, `router.post(...)`, etc.), then prints out the HTTP method and route path for each.

---

## How it works

1. **Set the target file:**  
   The script sets the file to scan for routes:
   ```powershell
   $routesFile = "src/routes/pets.ts"
   ```

2. **Check if the file exists:**  
   If the file doesn’t exist, it prints an error and exits:
   ```powershell
   if (!(Test-Path $routesFile)) {
       Write-Error "File not found: $routesFile"
       exit 1
   }
   ```

3. **Define the regex pattern:**  
   The pattern matches lines like `router.get('/some/path', ...)` or `app.post('/another/path', ...)`:
   ```powershell
   $routePattern = '(router|app)\.(get|post|put|patch|delete)\s*\(\s*["'']([^"'']+)["'']'
   ```

4. **Read the file and extract routes:**  
   For each line, if it matches the route pattern, it extracts the HTTP method and route path, then prints them:
   ```powershell
   Get-Content $routesFile | ForEach-Object {
       if ($_ -match $routePattern) {
           $method = $matches[2].ToUpper()
           $path = $matches[3]
           Write-Output "$method $path"
       }
   }
   ```

---

## Example Output

If your `pets.ts` contains:
```typescript
router.get('/dogs', ...)
router.post('/cats', ...)
```
The script will output:
```
GET /dogs
POST /cats
```

---

## Summary

This script is a quick way to list all Express routes defined in your `pets.ts` file, showing their HTTP method and path.
