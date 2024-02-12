import {ObjectFields, schemaContructor} from '@axelor/aos-mobile-core';

export const training_modelAPI: ObjectFields = {
  training_client: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
    partnerSeq: schemaContructor.string(),
    mainAddress: schemaContructor.subObject('fullName').concat(
      schemaContructor.object({
        addressL4: schemaContructor.string(),
        addressL7Country: schemaContructor.subObject('symbol'),
        city: schemaContructor.subObject('name'),
        zip: schemaContructor.string(),
      }),
    ),
    fixedPhone: schemaContructor.string(),
    emailAddress: schemaContructor.subObject('address'),
    partnerCategory: schemaContructor.subObject('name'),
    picture: schemaContructor.subObject('fileName'),
  }),
  training_clientsCategories: schemaContructor.object({
    name: schemaContructor.string(),
  }),
};
