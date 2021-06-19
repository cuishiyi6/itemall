import { sms } from 'tencentcloud-sdk-nodejs';
import { SMSConstant } from '../constant';

export const sendCode = async (phone, code): Promise<string> => {
  const smsClient = sms.v20190711.Client;
  const clientConfig = {
    credential: {
      secretId: SMSConstant.secretId,
      secretKey: SMSConstant.secretKey,
    },

    region: '',
    profile: {
      httpProfile: {
        endpoint: 'sms.tencentcloudapi.com',
      },
    },
  };
  //创建客户对象
  const client = new smsClient(clientConfig);
  //发送短信的参数
  const params = {
    PhoneNumberSet: ['86' + phone],
    TemplateID: SMSConstant.TemplateID,
    Sign: '雨道小程序',
    //验证码
    TemplateParamSet: [code],
    SmsSdkAppid: SMSConstant.SmsSdkAppid,
  };
  //发送验证码
  const { SendStatusSet } = await client.SendSms(params);
  return SendStatusSet[0].Message;
};
