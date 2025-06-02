import Navbar from "../components/Navbar"
import AuthProvider from "@/context/AuthProvider"
import Sidebar from "../components/SideBar"
export default function RootLayout({children} : {children : React.ReactNode}){
    return(
         <html lang="en">
              <AuthProvider>
              <body
              >
                <Navbar></Navbar>
                {/* <Sidebar></Sidebar> */}
                <div className="p-5 mt-14">{children}</div>                
              </body>
              </AuthProvider>
        </html>
    )
}