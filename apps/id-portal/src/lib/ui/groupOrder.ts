import { UiNodeGroupEnum } from "@ory/client";

export const groupOrder: UiNodeGroupEnum[] = [
  UiNodeGroupEnum.Default,
  UiNodeGroupEnum.Password,
  UiNodeGroupEnum.Oidc,
  UiNodeGroupEnum.Passkey,
  UiNodeGroupEnum.Webauthn,
  UiNodeGroupEnum.Code,
  UiNodeGroupEnum.Link,
  UiNodeGroupEnum.Totp,
  UiNodeGroupEnum.LookupSecret,
  UiNodeGroupEnum.Captcha,
  UiNodeGroupEnum.Saml,
  UiNodeGroupEnum.Oauth2Consent,
  UiNodeGroupEnum.Profile,
  UiNodeGroupEnum.UnknownDefaultOpenApi,
];
