import { Notify } from 'quasar'

export const alertService = {
  alertError,
  alertWarning,
  alertSuccess
}

function alertError (mes) {
  Notify.create({
    progress: true,
    message: mes,
    position: 'top-right',
    color: 'negative',
    icon: 'error',
    timeout: 5000,
    multiLine: true
  })
}

function alertWarning (mes) {
  Notify.create({
    progress: true,
    message: mes,
    position: 'top-right',
    color: 'warning',
    icon: 'warning',
    timeout: 5000,
    multiLine: true
  })
}

function alertSuccess (mes) {
  Notify.create({
    progress: true,
    message: mes,
    position: 'top-right',
    color: 'positive',
    icon: 'check_circle',
    timeout: 5000,
    multiLine: true
  })
}
