import '../scss/styles.scss';

// plugins
import './plugins/remodal';

// components
import './components/MapHome';
import './components/faqDropdowns';
import './components/membersCards';
import './components/customSelect';
import './components/overflowBodyForOpenMenu';
import './components/SearchMember';

// sliders
import './components/awardsSlider';
import './components/articlesSlider';

// api
import './components/Yelp';
import './components/adwerx';
import './components/Reviews';
import './components/buysideWidget';

// pages
import './pages/testimonials';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (import.meta.webpackHot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import.meta.webpackHot.accept();
}
