import {axiosApiProvider} from '@aos-mobile/core';

const prospectFields = [
  'simpleFullName',
  'name',
  'fullName',
  'partnerSeq',
  'mainAddress',
  'fixedPhone',
  'mobilePhone',
  'leadScoring',
  'emailAddress',
  'emailAddress.address',
  'user',
  'industrySector',
  'partnerCategory',
  'description',
  'webSite',
  'contactPartnerSet',
  'picture',
];

const sortByFields = ['name', 'partnerSeq', 'createdOn'];

const createProspectCriteria = searchValue => {
  let criterias = [];
  criterias.push({
    operator: 'and',
    criteria: [
      {
        fieldName: 'isContact',
        operator: '=',
        value: false,
      },
      {
        fieldName: 'isProspect',
        operator: '=',
        value: true,
      },
    ],
  });
  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'simpleFullName',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'partnerSeq',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'mainAddress.fullName',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'mobilePhone',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'fixedPhone',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'emailAddress.name',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  return criterias;
};

export async function searchProspect({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createProspectCriteria(searchValue),
          },
        ],
      },
      fields: prospectFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}