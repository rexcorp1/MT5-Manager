let RiskManagement = require('metaapi.cloud-sdk').RiskManagement;
let EquityChartListener = require('metaapi.cloud-sdk').EquityChartListener;

// your MetaApi API token
let token = process.env.TOKEN || '<put in your token here>';
// your MetaApi account id
// the account must have field riskManagementApiEnabled set to true
let accountId = process.env.ACCOUNT_ID || '<put in your account id here>';
let domain = process.env.DOMAIN;

const riskManagement = new RiskManagement(token, {domain});
const riskManagementApi = riskManagement.riskManagementApi;

class ExampleEquityChartListener extends EquityChartListener {
  async onEquityRecordUpdated(equityChartEvent) {
    console.log('equity record updated event received', equityChartEvent);
  }

  async onEquityRecordCompleted() {
    console.log('equity record completed event received');
  }

  async onConnected() {
    console.log('on connected event received');
  }

  async onDisconnected() {
    console.log('on disconnected event received');
  }

  async onError(error) {
    console.log('error event received', error);
  }
}

async function main() {
  try {
    // adding an equity chart listener
    let equityChartListener = new ExampleEquityChartListener();
    let listenerId = riskManagementApi.addEquityChartListener(equityChartListener, accountId);

    console.log('Streaming equity chart events for 1 minute...');
    await new Promise(res => setTimeout(res, 1000 * 60));
    riskManagementApi.removeEquityChartListener(listenerId);

    let equityChart = await riskManagementApi.getEquityChart(accountId);
    console.log('equity chart', JSON.stringify(equityChart));
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

main();
