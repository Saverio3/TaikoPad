
import {getAccount} from '@wagmi/core'
// Wagmi Config
import {config} from '@/app/config';

const getAddress = () => {
    const account = getAccount(config);
    const address = account.address;
    if(address)
        return address;
}

export default getAddress;