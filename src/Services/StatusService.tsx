import { StatusType } from '../constants/Status';

class Status {
  validar (status:string) {
    let res = '';
    if (status === StatusType.Activo) {
      res = 'Activa';
    } else if (status === StatusType.Renovado) {
      res = 'Renovada';
    } else if (status === StatusType.Cancelado) {
      res = 'Cancelada';
    } else if (status === StatusType.CambiodeConducto) {
      res = 'Cambio de Conducto';
    } else if (status === StatusType.NoFuePagado) {
      res = 'No fue pagada';
    } else if (status === StatusType.NoRenovado) {
      res = 'No renovada';
    }
    return res;
  };

  class (status:string) {
    let res = '';
    if (status === StatusType.Activo) {
      res = 'statusActive';
    } else if (status === StatusType.Renovado) {
      res = 'statusActive';
    } else if (status === StatusType.Cancelado) {
      res = 'statusWasNotPaid';
    } else if (status === StatusType.CambiodeConducto) {
      res = 'statusWarning';
    } else if (status === StatusType.NoFuePagado) {
      res = 'statusWasNotPaid';
    } else if (status === StatusType.NoRenovado) {
      res = 'statusWarning';
    }
    return res;
  }
};

export default new Status();
