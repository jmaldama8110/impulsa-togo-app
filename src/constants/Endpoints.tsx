const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Endpoints = {
  // User service
  Register: `${BASE_URL}/users`,
  Login: `${BASE_URL}/login`,
  VerifyCodeRegister: `${BASE_URL}/verificar`,
  ResendCodeRegister: `${BASE_URL}/codigoR`,
  RestorePassword: `${BASE_URL}/app/restorepassSMS`,
  RestoreVerifcationCode: `${BASE_URL}/app/restorepassVerify`,
  ResendRestoreCode: `${BASE_URL}/reenvio`,
  NewPassword: `${BASE_URL}/app/restorepass`,

  // PolicyService
  GetPolice: `${BASE_URL}/app/externalClient`,
  VerifyCodePolice: `${BASE_URL}/app/verificar`,
  ResendCodePolice: `${BASE_URL}/forwardcode`,
  ExternalPolicies: `${BASE_URL}/app/policies/external`,
  SelectPolicies: `${BASE_URL}/app/selectPolicy`,
  MyPolicies: `${BASE_URL}/app/policies`,
  DetailPolicy: `${BASE_URL}/app/policyDetail`,
  // DownloadPolicy: `${BASE_URL}/app/policie`,
  // DownloadPolicy: `${BASE_URL}/sync/policie`,
  DownloadPolicy: `${BASE_URL}/app/pruebaBlobPDF`,
  EditAlias: `${BASE_URL}/app/updateAlias`,

  // BusinessService
  GetBusiness: `${BASE_URL}/app/viewInsurances`,
  sendEmailSiniestro: `${BASE_URL}/app/sendEmailImpulsa`,

  // Notifications
  GetNotifications: `${BASE_URL}/app/notifications`,

  // Aviso de Privacidad
  GetPrivacyPolicie: `${BASE_URL}/app/privacyPolicies`
};
