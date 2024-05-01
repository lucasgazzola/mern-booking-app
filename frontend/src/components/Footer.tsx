const Footer = () => {
  return (
    <footer className="bg-cyan-500 h-24 flex justify-around items-center">
      <p>Desarrollado por Lucas Gazzola</p>
      <p>{new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
