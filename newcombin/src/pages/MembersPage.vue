<template>
  <q-page class="flex flex-center">
    <div class="row q-mx-md q-pa-xl bg-info">
      <div class="col-12 col-md-6 q-pa-md">
        <q-card class="bg-secondary">
          <q-form ref="letForm" @submit.prevent="asyncFunctionSaveMember" @reset="functionFormReset">
            <div class="row q-pa-sm">
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="letMember.firstName"
                  label="Name"
                  outlined
                  :disable="letLoading"
                  clearable
                >
                </q-input>
              </div>
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="letMember.lastName"
                  label="Lastname"
                  outlined
                  :disable="letLoading"
                  clearable
                >
                </q-input>
              </div>
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="letMember.address"
                  label="Address"
                  outlined
                  :disable="letLoading"
                  clearable
                >
                </q-input>
              </div>
              <div class="col-12 q-pa-sm">
                <q-input
                  v-model="letMember.ssn"
                  label="SSN"
                  outlined
                  :disable="letLoading"
                  mask="###-##-####"
                  clearable
                >
                </q-input>
              </div>
            </div>
            <div class="row q-pa-sm justify-around">
              <div class="col-6 q-pa-md text-center">
                <q-btn class="text-white bg-c-1" icon-right="autorenew" label="Reset" no-caps type="reset" />
              </div>
              <div class="col-6 q-pa-md text-center">
                <q-btn class="text-white bg-c-1" icon-right="save" :disable="functionIsValid" :loading="letLoading" label="Save" no-caps type="submit" />
              </div>
            </div>
          </q-form>
        </q-card>
      </div>
      <div class="col-12 col-md-6  q-pa-md">
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>SSN</th>
          </tr>
          <tr v-for="member in letMembers" :key="member">
            <th>{{ member.firstName }}</th>
            <th>{{ member.lastName }}</th>
            <th>{{ member.address }}</th>
            <th>{{ member.ssn }}</th>
          </tr>
        </table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, ref, computed, onMounted } from 'vue'
import { alertService } from '../../lib/alerts'
import { useAuthStore } from '../stores/auth'
import { useMemberStore } from '../stores/member'

const constColumns = [
  {
    name: 'firstName',
    label: 'First Name',
    field: 'firstName',
    sortable: true,
    sortOrder: 'ad',
    align: 'left'
  },
  {
    name: 'lastName',
    label: 'Last Name',
    field: 'lastName',
    sortable: true,
    sortOrder: 'ad',
    align: 'left'
  },
  {
    name: 'address',
    label: 'Address',
    field: 'address',
    sortable: true,
    sortOrder: 'ad',
    align: 'left'
  },
  {
    name: 'ssn',
    label: 'SSN',
    field: 'ssn',
    sortable: true,
    sortOrder: 'ad',
    align: 'center'
  }
]

export default {
  methods: {
  },
  setup () {
    const storeAuth = useAuthStore()
    const storeMember = useMemberStore()

    const letForm = ref(null)
    const letLoading = ref(false)
    const letMember = reactive({
      firstName: '',
      lastName: '',
      address: '',
      ssn: ''
    })
    const letMembers = ref([])

    onMounted(() => {
      functionTimeIdle()
    })

    asyncFunctionGetMembers()

    async function asyncFunctionLogin () {
      try {
        const member = {
          username: 'sarah',
          password: 'connor'
        }
        const result = await storeAuth.actionLogin(member)
        if (result.status === 200) {
          storeAuth.setToken(result.data.token)
        }
      } catch (err) {
        letLoading.value = false
        const mes = 'Error at login: ' + err.message
        console.error(mes)
        alertService.alertError(mes)
      }
    }

    async function asyncFunctionGetMembers () {
      try {
        letLoading.value = true
        await asyncFunctionLogin()
        const response = await storeMember.getMembers(storeAuth.token)
        if (response.status === 200) {
          letMembers.value = response.data
        }
        letLoading.value = false
      } catch (err) {
        letLoading.value = false
        const mes = 'Error getting members list: ' + err.message
        console.error(mes)
        alertService.alertError(mes)
      }
    }

    async function asyncFunctionSaveMember () {
      try {
        letLoading.value = true
        if (functionNoDuplicated(letMembers.value, letMember.ssn)) {
          const result = await storeMember.saveMember(storeAuth.token, letMember)
          if (result.status === 200) {
            alertService.alertSuccess('Member saved correctly.')
            console.log(letMembers.value)
            const aux = {
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              address: result.data.address,
              ssn: result.data.ssn

            }
            letMembers.value.push(aux)
            console.log(letMembers.value)
          } else {
            alertService.alertWarning('Error adding member.')
          }
        } else {
          alertService.alertWarning('Non unique ssn.')
        }
        letLoading.value = false
        functionFormReset()
      } catch (err) {
        letLoading.value = false
        const message = 'Error saving member: ' + err.message
        console.error(message)
        alertService.alertError(message)
      }
    }

    function functionFormReset () {
      letLoading.value = false
      letMember.firstName = ''
      letMember.lastName = ''
      letMember.address = ''
      letMember.ssn = ''
    }

    const functionIsValid = computed(() => {
      if (letMember.address.length > 1 && letMember.firstName.length > 1 && letMember.lastName.length > 1 && letMember.ssn.length === 11) {
        console.log('Valid')
        return false
      }
      return true
    })

    function functionNoDuplicated (arr, ssn) {
      const arrSsn = arr.map(function (member) { return member.ssn })
      return arrSsn.indexOf(ssn) === -1
    }

    function functionTimeIdle () {
      let time
      window.onload = resetTimer
      document.onmousemove = resetTimer
      document.onkeydown = resetTimer

      function refreshMembers () {
        console.log('Refresh Members')
        asyncFunctionGetMembers()
      }

      function resetTimer () {
        clearTimeout(time)
        time = setTimeout(refreshMembers, 3000)
      }
    }

    return {
      asyncFunctionSaveMember,
      functionFormReset,
      functionIsValid,

      constColumns,

      letForm,
      letLoading,
      letMember,
      letMembers
    }
  }
}
</script>

<style scoped>
th, td {
  padding: 15px;
  text-align: center;
}
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td, table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #1976D2;
  color: white;
}
</style>
