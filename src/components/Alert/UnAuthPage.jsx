

const UnAuthPage = () => {
  return (
    <section className="flex items-center justify-center h-[50vh] mx-6">
      <section className="flex flex-col gap-y-5 shadow-[-6px_6px_15px_rgba(0,0,0,0.5)] w-xl p-10 rounded-md">
        <h1 className="text-center text-3xl" style={{ fontFamily : "Rowdies" }}>🔒UNAUTHORIZED ACCESS</h1>
        <div className="text-center text-xl text-red-500">You don't have permission to view this page.</div>
        <div className="text-center">It looks like you're trying to access a restricted page . It may be because you are accessing a forbidden page or you are not logged in.</div>
      </section>
    </section>
  )
}

export default UnAuthPage;