import ARIlogo from '../assets/images/NFL_logos/ari.png';
import ATLlogo from '../assets/images/NFL_logos/atl.png';
import BALlogo from '../assets/images/NFL_logos/ari.png';
import BUFlogo from '../assets/images/NFL_logos/buf.png';
import CARlogo from '../assets/images/NFL_logos/car.png';
import CHIlogo from '../assets/images/NFL_logos/chi.png';
import CINlogo from '../assets/images/NFL_logos/chi.png';
import CLElogo from '../assets/images/NFL_logos/cle.png';
import DALlogo from '../assets/images/NFL_logos/dal.png';
import DENlogo from '../assets/images/NFL_logos/den.png';
import DETlogo from '../assets/images/NFL_logos/det.png';
import GBlogo from '../assets/images/NFL_logos/gb.png';
import HOUlogo from '../assets/images/NFL_logos/hou.png';
import INDlogo from '../assets/images/NFL_logos/ind.png';
import JAXlogo from '../assets/images/NFL_logos/jax.png';
import KClogo from '../assets/images/NFL_logos/kc.png';
import LAClogo from '../assets/images/NFL_logos/lac.png';
import LARlogo from '../assets/images/NFL_logos/lar.png';
import LVlogo from '../assets/images/NFL_logos/lv.png';
import MIAlogo from '../assets/images/NFL_logos/mia.png';
import MINlogo from '../assets/images/NFL_logos/min.png';
import NElogo from '../assets/images/NFL_logos/ne.png';
import NOlogo from '../assets/images/NFL_logos/no.png';
import NYGlogo from '../assets/images/NFL_logos/nyg.png';
import NYJlogo from '../assets/images/NFL_logos/nyj.png';
import PHIlogo from '../assets/images/NFL_logos/phi.png';
import PITlogo from '../assets/images/NFL_logos/pit.png';
import SEAlogo from '../assets/images/NFL_logos/sea.png';
import SFlogo from '../assets/images/NFL_logos/sf.png';
import TBlogo from '../assets/images/NFL_logos/tb.png';
import TENlogo from '../assets/images/NFL_logos/ten.png';
import UNKlogo from '../assets/images/NFL_logos/unk.png';
import WASlogo from '../assets/images/NFL_logos/was.png';


const ARIlogoUrl = ARIlogo.src;
const ATLlogoUrl = ATLlogo.src;
const BALlogoUrl = BALlogo.src;
const BUFlogoUrl = BUFlogo.src;
const CARlogoUrl = CARlogo.src;
const CHIlogoUrl = CHIlogo.src;
const CINlogoUrl = CINlogo.src;
const CLElogoUrl = CLElogo.src
const DALlogoUrl = DALlogo.src
const DENlogoUrl = DENlogo.src
const DETlogoUrl = DETlogo.src
const GBlogoUrl = GBlogo.src
const HOUlogoUrl = HOUlogo.src
const INDlogoUrl = INDlogo.src
const JAXlogoUrl = JAXlogo.src
const KClogoUrl = KClogo.src
const LAClogoUrl = LAClogo.src
const LARlogoUrl = LARlogo.src
const LVlogoUrl = LVlogo.src
const MIAlogoUrl = MIAlogo.src
const MINlogoUrl = MINlogo.src
const NElogoUrl = NElogo.src
const NOlogoUrl = NOlogo.src
const NYGlogoUrl = NYGlogo.src
const NYJlogoUrl = NYJlogo.src
const PHIlogoUrl = PHIlogo.src
const PITlogoUrl = PITlogo.src
const SEAlogoUrl = SEAlogo.src
const SFlogoUrl = SFlogo.src
const TBlogoUrl = TBlogo.src
const TENlogoUrl = TENlogo.src
const UNKlogoUrl = UNKlogo.src
const WASlogoUrl = WASlogo.src

type NFL_Image = {
  [key: string]: string;
};

export const NFL_TEAMS: NFL_Image = {
  ARI: ARIlogoUrl,
  ATL: ATLlogoUrl,
  BAL: BALlogoUrl,
  BUF: BUFlogoUrl,
  CAR: CARlogoUrl,
  CHI: CHIlogoUrl,
  CIN: CINlogoUrl,
  CLE: CLElogoUrl,
  DAL: DALlogoUrl,
  DEN: DENlogoUrl,
  DET: DETlogoUrl,
  GB: GBlogoUrl,
  HOU: HOUlogoUrl,
  IND: INDlogoUrl,
  JAX: JAXlogoUrl,
  KC: KClogoUrl,
  LAC: LAClogoUrl,
  LAR: LARlogoUrl,
  LV: LVlogoUrl,
  MIA: MIAlogoUrl,
  MIN: MINlogoUrl,
  NE: NElogoUrl,
  NO: NOlogoUrl,
  NYG: NYGlogoUrl,
  NYJ: NYJlogoUrl,
  PHI: PHIlogoUrl,
  PIT: PITlogoUrl,
  SEA: SEAlogoUrl,
  SF: SFlogoUrl,
  TB: TBlogoUrl,
  TEN: TENlogoUrl,
  UNK: UNKlogoUrl,
  WAS: WASlogoUrl,
};

export const getTeamLogoUrl = (team: string) => NFL_TEAMS[team];
