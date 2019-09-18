import React from 'react';
import {RootProvider} from '@/rootState';
import {Mask,ImgPreview} from '@/ui/comUi';
import {site_init} from '@/lib/sys';

export default ({ children }) => {
	site_init();
	return (
		<RootProvider><Mask /><ImgPreview />{children}</RootProvider>
	);
}

