import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleLogoutClick = () =>
  {
    localStorage.removeItem("currentUser");
    navigate('/');
  }

  async function clickHandlerBars()
  {
     setOpen(false);
  }

  async function clickHandlerCross()
  {
    setOpen(true);
  }
async function onClickHandler(e)
{
  setOpen(true);
}
  return (
    <div >
       <div className="flex top-0 justify-between items-center  mx-auto w-full  h-20 px-5
       bg-blue-200">
       <Link to="/">
           <div className="flex">
                  {/* <img src="../../images/logosvg12.svg" alt="Logo" width={55} loading='lazy'/> */}
                  <div className="mt-3 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-stone-800">livetest</div>
           </div>
        </Link>

            <nav className="flex max-w-maxScreen">
              <ul className="hidden items-center gap-x-5 md:flex">
              <li><NavLink className="py-5 flase text-lg leading-5 relative group flex gap-1 items-center link" to="/" end>
                <span>Home</span>
                </NavLink></li> 
                <li><NavLink className="py-5 flase text-lg leading-5 relative group flex gap-1 items-center link" to="/dashboard" end>
                <span>Dashboard</span>
                </NavLink></li>  
                <div>
                  {
                    localStorage.getItem("currentUser") ? (<li><NavLink onClick={handleLogoutClick} className="py-5 flase text-lg leading-5 relative group flex gap-1 items-center link cursor-pointer" to="/dashboard" end>
                    <span>Logout</span>
                    </NavLink></li>) : (<li><NavLink className="py-5 flase text-lg leading-5 relative group flex gap-1 items-center link" to="/login" end>
                <span>Login</span>
                </NavLink></li>)
                  }
                </div>     
                 
              </ul>
              <div className="flex items-center md:hidden">
              {
                open ? (
                <div className="relative flex h-[52px] w-[66px] cursor-pointer flex-col items-end justify-between p-[0.8rem] md:hidden" onClick={clickHandlerBars}>
                <span className="w-10 py-[2px] rounded-md bg-stone-600"></span>
                <span className="w-10 py-[2px] rounded-md bg-stone-600"></span>
                <span className="w-10 py-[2px] rounded-md bg-stone-600"></span>
                </div>) : (
                <div className="relative flex h-[52px] w-[66px] cursor-pointer flex-col items-end justify-between p-[0.8rem] md:hidden" onClick={clickHandlerCross}>
                <span className="w-10 py-[2px] rounded-md absolute top-1/2 rotate-45 bg-stone-600"></span>
                <span className="w-10 py-[2px] rounded-md absolute top-1/2 opacity-0 bg-stone-600"></span>
                <span className="w-10 py-[2px] rounded-md absolute top-1/2 -rotate-45 bg-stone-600"></span>
                </div>
                )
              }
              </div>
            </nav>
            </div>
            {
          !open ? (
       <div className="absolute left-0 right-0 z-[9998] backdrop-blur-3xl pt-[10vh] pb-[8vh] md:hidden pointer-events-auto 
       visible">
       
        <ul className="flex flex-col items-center gap-y-6 md:hidden select-none text-xl">
        <li className="text-center"><NavLink class="leading-5" to="/" onClick={onClickHandler}>Home</NavLink></li>
        <li className="text-center"><NavLink class="leading-5" to="/dashboard" onClick={onClickHandler}>Dashboard</NavLink></li>
        <div onClick={onClickHandler}>
                  {
                    localStorage.getItem("currentUser") ? (<li><div onClick={handleLogoutClick} className="py-5 flase text-xl leading-5 relative group flex gap-1 items-center link cursor-pointer" to="/dashboard" end>
                    <span>Logout</span>
                    </div></li>) : (<li><NavLink  className="py-5 flase text-lg leading-5 relative group flex gap-1 items-center link" to="/login" end>
                <span>Login</span>
                </NavLink></li>)
                  }
                </div> 
        </ul>
       </div>
          ): (<div></div>)
      }
       </div>     
  )
}

export default Header