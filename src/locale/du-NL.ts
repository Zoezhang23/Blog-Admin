import localeSettings from './du-NL/setting';
import localeMessageBox from '../components/MessageBox/locale/en-US';
import localeSearchTable from '../pages/search-table/locale/du-NL';
import localeWelcome from '../pages/welcome/locale//du-NL';

export default {
    'menu.list': 'Lijst',
    'navbar.docs': 'Documenten',
    'menu.category': 'Categorieën',
    ...localeSettings,
    ...localeMessageBox,
    ...localeSearchTable,
    ...localeWelcome,
};