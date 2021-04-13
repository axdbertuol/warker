import { remote } from 'webdriverio';

const capabilities = {
  platformName: 'android',
  deviceName: '4.65_720p_Galaxy_Nexus_API_30', // Change to the name of the AVD you're using
  automationName: 'UiAutomator2',
  pkg: 'host.exp.exponent',
  intentAction: 'android.intent.action.VIEW',
  activity: 'host.exp.exponent.experience.HomeActivity',
  appWaitForLaunch: true,
};

const options = {
  path: '/wd/hub/',
  port: 4723,
};

async function launchExpoAndroid() {
  const client = await remote({ ...options, capabilities });
  await client.closeApp();
  await client.startActivity(androidCaps.pkg, androidCaps.activity); //Reload to force update
  await client.execute('mobile:deepLink', {
    url: 'exp://127.0.0.1:19000',
    package: androidCaps.pkg,
  });
  return client;
}

describe('Example Test', () => {
  let client;

  beforeAll(async () => {
    client = await launchExpoAndroid();
  });

  afterAll(async () => {
    await client.deleteSession();
  });

  // Add tests here
});
