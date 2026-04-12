export class FraseDia {
  _id!: string;
  frase_id!: string;
  frase!: string;
  dia!: string;
  fecha_actualiz?: string;

  constructor(partial: Partial<FraseDia>) {
    Object.assign(this, partial);
  }
}

export class FraseGuardada {
  _id!: string;
  usuario_id!: string;
  frase_id!: string;

  constructor(partial: Partial<FraseGuardada>) {
    Object.assign(this, partial);
  }
}
