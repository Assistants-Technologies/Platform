Param(
    [string]$ScriptPath = "$(Join-Path $PSScriptRoot '..' 'cli.sh')"
)

if (!(Test-Path $ScriptPath)) {
    Write-Output "❌ ERROR: cli.sh not found at $ScriptPath"
    exit 1
}

# Ensure profile exists
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
    Write-Output "✅ Created PowerShell profile at $PROFILE"
}

# Define platform function
$aliasLine = @"
function platform {
    & "$ScriptPath" @Args
}
"@

# Add alias if missing
if (-not (Select-String -Path $PROFILE -Pattern "function platform" -Quiet)) {
    Add-Content -Path $PROFILE -Value $aliasLine
    Write-Output "✅ Added 'platform' function to $PROFILE"
} else {
    Write-Output "ℹ️ 'platform' function already exists in $PROFILE"
}

Write-Output "`n⚡ Reload your profile with:`n    . $PROFILE`n"
Write-Output "Then run for example:`n    platform up --build`n"