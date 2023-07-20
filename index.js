const Config = require('@alicloud/openapi-client').Config;
const FCClient = require('@alicloud/fc20230330').default;
const GetFunctionRequest = require('@alicloud/fc20230330').GetFunctionRequest;
require('dotenv').config();

const FC_CLIENT_DEFAULT_TIMEOUT = 600 * 1000;

const fc20230330Client = (credentials) => {
  const {
    AccessKeyID: accessKeyId,
    AccessKeySecret: accessKeySecret,
  } = credentials;

  const config = new Config({
    accessKeyId,
    accessKeySecret,
    protocol: 'https',
    endpoint: `${process.env.AccountID}.cn-hangzhou.fc.aliyuncs.com`,
    readTimeout: FC_CLIENT_DEFAULT_TIMEOUT,
    connectTimeout: FC_CLIENT_DEFAULT_TIMEOUT,
  });

  return new FCClient(config);
}

const client = fc20230330Client({
  AccessKeyID: process.env.AccessKeyID,
  AccessKeySecret: process.env.AccessKeySecret,
});

const getFunctionRequest = new GetFunctionRequest({});

(async () => {
  console.log('start get function')
  try {
    const response = await client.getFunction('fc3-wss', getFunctionRequest);
    console.log('response', response)
  } catch (error) {
    console.log(error)
  }
  console.log('end get function')
})();
