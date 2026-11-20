import Badges from '../ui/badges';
import Avatar from '../ui/avatars';
import Button from '../ui/buttons';
import Card from '../ui/Card';
import Breadcrumb from '../ui/breadcrumbs';
import { FiHome } from 'react-icons/fi';
import img1 from '../../assets/user/1.png';

const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple', 'pink', 'teal', 'indigo'];

const BadgesUi = () => {
  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Badge Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Small count and labeling components</p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Badges' },
          ]}
        />
      </div>

      <div className="grid md:grid-cols-2 mb-6 gap-6">
        {/* Default Badges */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Default Badges</h3>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {COLORS.map((c) => (
              <Badges key={`b-${c}`} color={c}>
                {c}
              </Badges>
            ))}
          </div>
        </Card>

        {/* Badges Rounded Pill */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Rounded Pill Badges</h3>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {COLORS.map((c) => (
              <Badges rounded="pill" key={`p-${c}`} color={c}>
                {c}
              </Badges>
            ))}
          </div>
        </Card>

        {/* Badges Outline */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Outline Badges</h3>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {COLORS.map((c) => (
              <Badges variant="outline" key={`o-${c}`} color={c}>
                {c}
              </Badges>
            ))}
          </div>
        </Card>

        {/* Badges Rounded Pill Outline */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Rounded Pill Outline Badges</h3>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {COLORS.map((c) => (
              <Badges variant="outline" rounded="pill" key={`op-${c}`} color={c}>
                {c}
              </Badges>
            ))}
          </div>
        </Card>

        {/* Badges Soft */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Soft Badges</h3>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {COLORS.map((c) => (
              <Badges variant="soft" key={`s-${c}`} color={c}>
                {c}
              </Badges>
            ))}
          </div>
        </Card>

        {/* Badges Soft Rounded Pill */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Soft Rounded Pill Badges</h3>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            {COLORS.map((c) => (
              <Badges variant="soft" rounded="pill" key={`sp-${c}`} color={c}>
                {c}
              </Badges>
            ))}
          </div>
        </Card>

        {/* Badges Size */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Badge Sizes</h3>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badges size="sm">Small</Badges>
            <Badges size="md">Medium</Badges>
            <Badges size="lg">Large</Badges>
            <Badges size="lg" rounded="pill" variant="soft" color="primary">
              Pill Large
            </Badges>
          </div>
        </Card>

        {/* Badges With Button */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Badges with Buttons</h3>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Button variant="soft" color="secondary" className="flex items-center gap-2">
              <span>Notify</span>
              <span className="inline-block w-2 h-2 bg-primary rounded-full" />
              <Badges variant="solid" color="danger" size="sm">
                9
              </Badges>
            </Button>
            <Button variant="soft" color="secondary" className="flex items-center gap-2">
              <span>Requests</span>
              <Badges variant="solid" color="info" size="sm">
                4
              </Badges>
            </Button>
            <Button variant="soft" color="secondary" className="flex items-center gap-2">
              <span>Completed</span>
              <Badges rounded="pill" variant="soft" color="primary" size="sm">
                24
              </Badges>
            </Button>
          </div>
        </Card>

        {/* Badges Positioned */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Positioned Badges</h3>
          <div className="flex flex-wrap items-center gap-8 mt-4">
            <Badges.Positioned content={<Badges rounded="pill" variant="solid" color="danger" size="sm">9</Badges>}>
              <Button variant="soft" color="secondary">Inbox</Button>
            </Badges.Positioned>
            <Badges.Positioned position="top-left" content={<Badges variant="solid" color="warning" size="sm">New</Badges>}>
              <Button variant="soft" color="secondary">Projects</Button>
            </Badges.Positioned>
            <Badges.Positioned position="bottom-right" content={<Badges variant="solid" color="success" size="sm">Pro</Badges>}>
              <Button variant="soft" color="secondary">Upgrade</Button>
            </Badges.Positioned>
          </div>
        </Card>

        {/* Badges Dot Positioned */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Positioned Indicator Dots</h3>
          <div className="flex flex-wrap items-center gap-8 mt-4">
            <Badges.Positioned content={<Badges dot color="success" rounded="pill" />}>
              <Avatar src={img1} />
            </Badges.Positioned>
            <Badges.Positioned content={<Badges dot color="danger" rounded="pill" />} position="bottom-right">
              <Avatar type="icon" variant="outline" color="teal" />
            </Badges.Positioned>
            <Badges.Positioned content={<Badges dot color="warning" rounded="pill" />} position="top-left">
              <Avatar type="letter" name="V" variant="solid" color="rose" />
            </Badges.Positioned>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BadgesUi;
