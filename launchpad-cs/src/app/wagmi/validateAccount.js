import {getAccount} from '@wagmi/core'
// Wagmi Config
import {config} from '@/app/config';

const getAddress = (messageApi) => {
    const account = getAccount(config);
    const status = account.status;
    // if (status === 'connected') {
    //     setTimeout(() => {
    //         messageApi.open({type: 'success', content: `Your wallet is connected`, duration: 2});
    //     }, 1000);
    //     return true;
    // }
    if (status === 'disconnected') {
        setTimeout(() => {
            messageApi.open({type: 'failure', content: `Your wallet is not connected`, duration: 2});
        }, 1000);
        return false;
    }
}

export default getAddress;
