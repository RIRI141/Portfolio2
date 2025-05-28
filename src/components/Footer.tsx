

const Footer = () => {
  return (
    <footer className="w-full  neon-flicker-colorful">
        <div className="h-16 flex items-center justify-center">
            <p className=" text-center text-white">
                &copy; { new Date().getFullYear() } <br />
                RYOGA ISHII All Rights Reserved
            </p>
        </div>
    </footer>
  )
}

export default Footer