import AuthProvider from "@/context/AuthProvider"
import Sidebar from "@/app/components/SideBar"
export default function RootLayout({children} : {children : React.ReactNode}){
    return (
        <html lang="en">
            <AuthProvider>
                <body>
                    <Sidebar></Sidebar>
                    <div className="md:ml-38">{children}</div>
                </body>
            </AuthProvider>
        </html>
    )
}