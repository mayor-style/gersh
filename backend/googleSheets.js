const { google } = require('googleapis');
const path = require('path');

// Load client secrets from a local file
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

const sheets = google.sheets('v4');

async function appendData(spreadsheetId, range, values) {
  const authClient = await auth.getClient();
  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: { values },
    auth: authClient,
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    return response.data;
  } catch (error) {
    console.error('Error appending data:', error);
    throw error;
  }
}

module.exports = { appendData };
