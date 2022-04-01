<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-secondary text-white">
      <q-toolbar class="text-white q-my-md">
          <div class="col-12 col-md-4 text-center">
            <q-btn unelevated color="secondary" label="Home" no-caps :to="{ name: 'HomePage' }" />
          </div>
          <div class="col-12 col-md-4 text-center">
            <q-btn unelevated color="secondary" label="Member" no-caps :to="{ name: 'MembersPage' }" />
          </div>
          <div class="col-12 col-md-4 text-center">
            <q-btn unelevated color="secondary" label="Contact" no-caps :to="{ name: 'ContactPage' }" />
          </div>
      </q-toolbar>
    </q-header>

    <q-footer elevated class="bg-primary text-white">
      <div class="row q-ma-md">
        <div class="col text-center">
          <span>Copyright&copy;{{ new Date().getFullYear() }}</span>
        </div>
        <q-space />
        <div class="col text-center">
          <span>All rights reserved</span>
        </div>
      </div>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  setup () {
    return {
    }
  }
}
</script>
