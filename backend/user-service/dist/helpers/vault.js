import vault from 'node-vault';
console.log('asdfsfsdf');
const client = vault({
    endpoint: 'http://host.docker.internal:8200',
    token: 'root'
});
async function loadSecrets() {
    console.log('here mannnnn');
    const result = await client.read('secret/data/cinescope-user-service');
    console.log('resu;ttt', result);
    const secrets = result.data.data;
    console.log(secrets);
    process.env.PORT = secrets.PORT;
    process.env.POSTGRES_URL = secrets.POSTGRES_URL;
    process.env.ACCESS_SECRET = secrets.ACCESS_SECRET;
    process.env.REFRESH_SECRET = secrets.REFRESH_SECRET;
    console.log('Secrets loaded from vault!');
}
export default loadSecrets;
