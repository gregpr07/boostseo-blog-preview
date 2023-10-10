import Image from 'next/image';

import { classNames } from '@/lib/utils';

import { IIcon } from '@/components/icons';

export const LogoBoostSEO: IIcon = ({ className }) => {
  return (
    <div className='flex flex-shrink-0 items-center gap-2'>
      <Image
        src='/images/icon.svg'
        alt='logo'
        height={20}
        width={20}
        className={classNames(className)}
      />
    </div>
  );
};
