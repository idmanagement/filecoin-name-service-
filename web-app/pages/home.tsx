import Footer from '@/components/footer'
import SidebarButton from '@/components/SidebarButton';
import NameDisplayer from '@/components/NameDisplayer';
import MessageBox from '@/components/MessageBox';
import NavBar from '@/components/NavBar';
import { getAccount } from '@wagmi/core'
import Modal from '@/components/Modal';
import { useState } from 'react';


function Home() {

  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const account = getAccount()

  const searchForName = async() => {
    window.alert(name)
    setTimeout(() => setName(''), 4000) 
  }

  return (
    <div>
        <div className='h-[88vh]'>
          <NavBar/>
          <div className='h-[75vh] flex'>
            <div className='hidden md:flex w-1/6 h-full flex-col justify-center'>
                <SidebarButton icon={'home'} text='Home' path='/home'/>
                <SidebarButton icon={'settings'} text='Manage' path='/manage'/>
            </div>
            <div className='w-full md:w-5/6 h-full flex flex-col items-center bg-slate-100'>
              <div className="h-2/6 flex items-center" >
                {!account?.address && <MessageBox message={'Connect your wallet in order to register a name'}/>}
              </div>
              <div className='h-1/6 flex justify-center items-center w-full'>
                <div className='min-w-[350px] w-1/2 h-12 px-2 rounded-2xl flex items-center justify-center bg-slate-200'>
                  <input type="text" placeholder='Eg: "name" ... not "name.fil" ' onChange={(e) => setName(e.target.value)} value={name} className='w-full h-5/6 pl-2 mr-1 rounded-sm border-none outline-none bg-slate-100' />
                  <div className='h-[2.5rem] w-[2.7rem] flex items-center justify-center bg-white hover:transition-all rounded-full hover:scale-105'>
                    <img src="/icons/search.svg" alt="" onClick={searchForName} className='h-4/6 cursor-pointer' />
                  </div>
                </div>
              </div>
              <div className='h-3/6 w-full flex justify-center items-center'>
                {name ? <NameDisplayer setModal = {setShowModal}/> : <MessageBox message='Name already taken'/>}
              </div>
            </div>
          </div>
        </div>
        {showModal && <Modal setModal = {setShowModal}/>}
        <Footer/>
    </div>
  )
}

export default Home