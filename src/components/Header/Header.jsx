import React from 'react'
import { Container, Logo, LogoutBtn,Button } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: '/add-post',
      active: authStatus,
    }
  ]
  return (
    <header className="py-3 shadow bg-cyan-700 border border-purple-700 hover:border-black hover:border-b-2 hover:duration-300">
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' img='https://tse2.mm.bing.net/th?id=OIG2.QIhi2PI2hl3nhoRJPH1s&w=270&h=270&c=6&r=0&o=5&dpr=1.5&pid=ImgGn' />
            </Link>
          </div>

          <ul className='flex items-center justify-end w-11/12 gap-x-12'>
            {
              navItems.map((item) => {
                return item.active ? <li key={item.name}>
                  <Button children={item.name}  onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-green-100 rounded-2xl hover:scale-105'
                    bgColor={`bg-white/90`}
                    textColor='text-green-800'
                  />
                </li> : null
              })
            }
            {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header