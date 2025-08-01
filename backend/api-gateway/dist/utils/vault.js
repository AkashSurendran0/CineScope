import vault from 'node-vault';
const client = vault({
    endpoint: 'http://host.docker.internal:8200',
    token: 'root'
});
async function loadSecrets() {
    const result = await client.read('secret/data/cinescope-api-gateway');
    const secrets = result.data.data;
    console.log(secrets);
    process.env.PORT = secrets.PORT;
    process.env.ACCESS_SECRET = secrets.ACCESS_SECRET;
    process.env.REFRESH_SECRET = secrets.REFRESH_SECRET;
    console.log('Secrets loaded from vault!');
}
export default loadSecrets;
