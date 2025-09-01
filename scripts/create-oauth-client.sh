#!/bin/bash

HYDRA_ADMIN_URL="http://localhost:4445"

echo "Creating OAuth2 client..."

curl -X POST \
  "$HYDRA_ADMIN_URL/admin/clients" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "test-client",
    "client_name": "Test Application",
    "client_secret": "test-secret",
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "scope": "openid profile email offline_access",
    "redirect_uris": ["https://api.assts.site/callback"],
    "post_logout_redirect_uris": ["https://api.assts.site/"],
    "audience": [],
    "subject_type": "public",
    "token_endpoint_auth_method": "client_secret_basic"
  }'

echo ""
echo "OAuth2 client created successfully!"
echo ""
echo "Client Details:"
echo "  Client ID: test-client"
echo "  Client Secret: test-secret"
echo "  Redirect URI: https://api.assts.site/callback"
echo ""
echo "To test the OAuth2 flow, visit:"
echo "https://oauth.assts.site/oauth2/auth?client_id=test-client&redirect_uri=https://api.assts.site/callback&response_type=code&scope=openid+profile+email&state=some-random-state"
