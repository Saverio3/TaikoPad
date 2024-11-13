// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'

export const ConnectBtn = () => {
  // const { open, close } = useWeb3Modal();
  // const { disconnect } = useDisconnect()
  // const { address, isConnecting, isDisconnected } = useAccount();

  // console.log(address);
  // console.log(isDisconnected);

  // let btnComp;
  // if (isConnecting) btnComp = <button className='text-white'>Connecting...</button>;
  // if (isDisconnected) btnComp = <button className='text-white' onClick={() => open()}>Open</button>;

  return (
    <w3m-button />
    // <ConnectButton.Custom>
    //   {({
    //     account,
    //     chain,
    //     openAccountModal,
    //     openChainModal,
    //     openConnectModal,
    //     authenticationStatus,
    //     mounted,
    //   }) => {
    //     // Note: If your app doesn't use authentication, you
    //     // can remove all 'authenticationStatus' checks
    //     const ready = mounted && authenticationStatus !== 'loading';
    //     const connected =
    //       ready &&
    //       account &&
    //       chain &&
    //       (!authenticationStatus ||
    //         authenticationStatus === 'authenticated');

    //     return (
    //       <div
    //         {...(!ready && {
    //           'aria-hidden': true,
    //           'style': {
    //             opacity: 0,
    //             pointerEvents: 'none',
    //             userSelect: 'none',
    //           },
    //         })}
    //       >
    //         {(() => {
    //           if (!connected) {
    //             return (
    //               <button onClick={openConnectModal} type="button" className='flex bg-[#C03F4A] text-[#16171B] text-[16px] rounded-[30px] h-[35px] px-[18px] py-[5px]'>
    //                 <img alt="image" loading="lazy" width="20" height="16" className="undefined next-exported-image-blur-svg pt-1 mr-1" src="https://flash-launch.com/_next/static/media/wallet.3558e8cd.svg" style={{color: "transparent"}} />
    //                 <p className='md:block hidden'>Connect</p>
    //               </button>
    //             );
    //           }

    //           if (chain.unsupported) {
    //             return (
    //               <button onClick={openChainModal} type="button" className='flex bg-[#C03F4A] text-[#16171B] text-[16px] rounded-[30px] h-[35px] px-[18px] py-[5px]'>
    //                 <img alt="image" loading="lazy" width="20" height="16" className="undefined next-exported-image-blur-svg pt-1 mr-1" src="https://flash-launch.com/_next/static/media/wallet.3558e8cd.svg" style={{color: "transparent"}} />
    //                 Wrong network
    //               </button>
    //             );
    //           }

    //           return (
    //             <div style={{ display: 'flex', gap: 12 }}>
    //               <button
    //                 onClick={openChainModal}
    //                 style={{ display: 'flex', alignItems: 'center' }}
    //                 type="button"
    //                 className='hidden xxl:flex rounded-full bg-[#282828] text-white text-[16px] h-[35px] px-[8px] py-[5px]'
    //               >
    //                 {chain.hasIcon && (
    //                   <div
    //                     style={{
    //                       background: chain.iconBackground,
    //                       width: 23,
    //                       height: 23,
    //                       borderRadius: 999,
    //                       overflow: 'hidden',
    //                       marginRight: 4,
    //                     }}
    //                   >
    //                     {chain.iconUrl && (
    //                       <img
    //                         alt={chain.name ?? 'Chain icon'}
    //                         src={chain.iconUrl}
    //                         style={{ width: 23, height: 23 }}
    //                       />
    //                     )}
    //                   </div>
    //                 )}
    //                 <p className='xl:block hidden'>{chain.name}</p>
    //               </button>

    //               <button onClick={openAccountModal} type="button"
    //                 className='px-[12px] py-[5px] flex flex-row justify-center items-center gap-2 rounded-full h-[35px] bg-[#C03F4A] border border-[#282828]'>
    //                     <img alt="image" loading="lazy" width="20" height="16" className="undefined next-exported-image-blur-svg" src="https://flash-launch.com/_next/static/media/wallet.3558e8cd.svg" style={{color: "transparent"}} />
    //                     <div className='flex-col xl:block hidden'>
    //                         <p className='text-[#16171B] text-[11px]'>
    //                             { account.displayName}
    //                         </p>
    //                         <p className='text-[#16171B] text-[12px] font-[600]'>
    //                             { account.displayBalance ? ` (${
    //                                 account.displayBalance
    //                             })` : ''
    //                         }</p>
    //                     </div>
    //               </button>
    //             </div>
    //           );
    //         })()}
    //       </div>
    //     );
    //   }}
    // </ConnectButton.Custom>
  );
};