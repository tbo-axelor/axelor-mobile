import {
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createClientCriteria = searchValue => {
  return [
    {
      operator: 'and',
      criteria: [
        {
          fieldName: 'isContact',
          operator: '=',
          value: false,
        },
        {
          fieldName: 'isCustomer',
          operator: '=',
          value: true,
        },
      ],
    },
    getSearchCriterias('training_client', searchValue),
  ];
};

export async function searchClient({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createClientCriteria(searchValue),
    fieldKey: 'training_client',
    sortKey: 'training_client',
    page,
  });
}

export async function getClientsCategory() {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.PartnerCategory',
    fieldKey: 'training_clientsCategories',
    criteria: [],
    page: 0,
  });
}
