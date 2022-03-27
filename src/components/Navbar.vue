<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Thamrin Tech</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            {{ user.displayName }}
            </a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#" @click="handleLogout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import useLogout from '../composable/useLogout'
import getUser from '../composable/getUser'

export default {
setup() {
  const {error, logout} = useLogout()
  const {user} = getUser()

  const handleLogout = async () => {
    await logout()
    if(!error.value) {
      console.log('Logout users')
    }
  }
  return {handleLogout, user}
},
}
</script>

<style>

</style>