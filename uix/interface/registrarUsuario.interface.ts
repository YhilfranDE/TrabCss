
export interface registrarPersona {

  customerDocumentNumber      :string,
  customerCarnetNumber        ?:string,
  representativeDocumentNumber:string,
  representativeCarnetNumber  ?:string;
  representativeEmail         :string, 
  documentType                :string,
  representativeDocumentType  : string
};

export interface registrarEmpresa {

  customerDocumentNumber       :string,
  representativeDocumentNumber :string,
  representativeEmail          :string, 
  carnet                       ?:string,
  documentType                 :string

};



