import {Certificate} from './certificate';
import {Tag} from './tag';

export type CertificatesData = {
  _embedded: {
    giftCertificateDtoList: Certificate[];
  }
};

export type TagsData = {
  _embedded: {
    tagDtoList: Tag[];
  }
};

