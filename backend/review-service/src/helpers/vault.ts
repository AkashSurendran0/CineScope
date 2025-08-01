import vault from 'node-vault'

const client=vault({
    endpoint: 'http://host.docker.internal:8200',
    token: 'root'
})

async function loadSecrets(){
    const result=await client.read('secret/data/cinescope-review-service')
    const secrets=result.data.data
    console.log(secrets)

    process.env.PORT = secrets.PORT;
    process.env.MONGO_URL = secrets.MONGO_URL;

    console.log('Secrets loaded from vault!')
}

export default loadSecrets