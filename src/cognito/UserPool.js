import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_Z3fEEsjmu',
  ClientId: '6vsb430r28f6h5sobotmit1cv2',
};

export default new CognitoUserPool(poolData);