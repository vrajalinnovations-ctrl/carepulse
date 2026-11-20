import Avatar from '../ui/avatars';
import Card from '../ui/Card';
import Breadcrumb from '../ui/breadcrumbs';
import { FiUser, FiHome } from 'react-icons/fi';
import img1 from '../../assets/user/1.png';
import img2 from '../../assets/user/2.png';
import img3 from '../../assets/user/3.png';
import img4 from '../../assets/user/4.png';
import img5 from '../../assets/user/5.png';
import img6 from '../../assets/user/6.png';

const COLORS = ['primary', 'emerald', 'rose', 'amber', 'cyan', 'slate', 'purple', 'pink', 'teal', 'indigo'];
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const AvatarUi = () => {
  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Avatar Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">User profile images with various sizes and styles</p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Avatars' },
          ]}
        />
      </div>

      <div className="grid md:grid-cols-2 mb-6 gap-6">
        {/* Default Avatar */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Default Avatar</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar src={img1} alt="User 1" />
            <Avatar src={img2} alt="User 2" />
            <Avatar src={img3} alt="User 3" />
            <Avatar src={img4} alt="User 4" />
            <Avatar src={img5} alt="User 5" />
            <Avatar src={img6} alt="User 6" />
          </div>
        </Card>

        {/* Avatar Rounded */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Rounded</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {SIZES.map((s, i) => (
              <Avatar key={s} src={[img1, img2, img3, img4, img5, img6][i % 6]} size={s} rounded={s} />
            ))}
          </div>
        </Card>

        {/* Avatar Bordered */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Bordered</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {COLORS.map((c, i) => (
              <Avatar key={c} src={[img1, img2, img3, img4, img5, img6][i % 6]} bordered color={c} />
            ))}
          </div>
        </Card>

        {/* Avatar Sizes */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Sizes</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {SIZES.map((s, i) => (
              <Avatar key={s} src={[img1, img2, img3, img4, img5, img6][i % 6]} size={s} />
            ))}
          </div>
        </Card>

        {/* Avatar Default Icon */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Default Icon</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar type="icon" variant="solid" color="emerald" size="md" />
            <Avatar type="icon" variant="solid" color="rose" size="md" />
            <Avatar type="icon" variant="solid" color="amber" size="md" />
            <Avatar type="icon" variant="solid" color="cyan" size="md" />
            <Avatar type="icon" variant="solid" color="purple" size="md" />
            <Avatar type="icon" variant="solid" color="indigo" size="md" />
            <Avatar type="icon" variant="solid" color="pink" size="md" />
            <Avatar type="icon" variant="solid" color="teal" size="md" />
          </div>
        </Card>

        {/* Avatar Outline Icon */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Outline Icon</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar type="icon" variant="outline" color="emerald" />
            <Avatar type="icon" variant="outline" color="rose" />
            <Avatar type="icon" variant="outline" color="amber" />
            <Avatar type="icon" variant="outline" color="cyan" />
            <Avatar type="icon" variant="outline" color="purple" />
            <Avatar type="icon" variant="outline" color="indigo" />
            <Avatar type="icon" variant="outline" color="pink" />
            <Avatar type="icon" variant="outline" color="teal" />
          </div>
        </Card>

        {/* Avatar Soft Icon */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Soft Icon</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar type="icon" variant="soft" color="emerald" />
            <Avatar type="icon" variant="soft" color="rose" />
            <Avatar type="icon" variant="soft" color="amber" />
            <Avatar type="icon" variant="soft" color="cyan" />
            <Avatar type="icon" variant="soft" color="purple" />
            <Avatar type="icon" variant="soft" color="indigo" />
            <Avatar type="icon" variant="soft" color="pink" />
            <Avatar type="icon" variant="soft" color="teal" />
          </div>
        </Card>

        {/* Avatar Icon Sizes */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Icon Sizes</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar type="icon" variant="solid" color="emerald" size="2xl" />
            <Avatar type="icon" variant="solid" color="rose" size="xl" />
            <Avatar type="icon" variant="solid" color="amber" size="lg" />
            <Avatar type="icon" variant="solid" color="pink" size="md" />
            <Avatar type="icon" variant="solid" color="teal" size="sm" />
          </div>
        </Card>

        {/* Avatar Letter */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Letter</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar variant="solid" color="emerald" name="A" />
            <Avatar variant="solid" color="rose" name="B" />
            <Avatar variant="solid" color="amber" name="C" />
            <Avatar variant="solid" color="cyan" name="D" />
            <Avatar variant="solid" color="purple" name="E" />
            <Avatar variant="solid" color="indigo" name="F" />
            <Avatar variant="solid" color="pink" name="G" />
            <Avatar variant="solid" color="teal" name="H" />
          </div>
        </Card>

        {/* Avatar Outline Letter */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Outline Letter</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar variant="outline" color="emerald" name="1" />
            <Avatar variant="outline" color="rose" name="2" />
            <Avatar variant="outline" color="amber" name="3" />
            <Avatar variant="outline" color="cyan" name="4" />
            <Avatar variant="outline" color="purple" name="5" />
            <Avatar variant="outline" color="indigo" name="6" />
            <Avatar variant="outline" color="pink" name="7" />
            <Avatar variant="outline" color="teal" name="8" />
          </div>
        </Card>

        {/* Avatar Soft Letter */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Soft Letter</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar variant="soft" color="emerald" name="A" />
            <Avatar variant="soft" color="rose" name="B" />
            <Avatar variant="soft" color="amber" name="C" />
            <Avatar variant="soft" color="cyan" name="D" />
            <Avatar variant="soft" color="purple" name="E" />
            <Avatar variant="soft" color="indigo" name="F" />
            <Avatar variant="soft" color="pink" name="G" />
            <Avatar variant="soft" color="teal" name="H" />
          </div>
        </Card>

        {/* Avatar Letter Sizes */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Letter Sizes</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar variant="solid" color="emerald" size="2xl" name="1" />
            <Avatar variant="solid" color="rose" size="xl" name="2" />
            <Avatar variant="solid" color="amber" size="lg" name="3" />
            <Avatar variant="solid" color="cyan" size="md" name="4" />
            <Avatar variant="solid" color="purple" size="sm" name="5" />
          </div>
        </Card>

        {/* Avatar Status */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Status</h3>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Avatar variant="solid" color="emerald" size="md" name="vv" status="online" />
            <Avatar variant="solid" color="rose" size="md" name="vv" status="idle" />
            <Avatar variant="solid" color="amber" size="md" name="vv" status="busy" />
            <Avatar variant="solid" color="cyan" size="md" name="vv" status="offline" />
            <Avatar variant="solid" color="purple" size="md" name="vv" status="online" />
            <Avatar variant="solid" color="indigo" size="md" name="vv" status="idle" />
            <Avatar variant="solid" color="pink" size="md" name="vv" status="busy" />
            <Avatar variant="solid" color="teal" size="md" name="vv" status="offline" />
          </div>
        </Card>

        {/* Avatar Group */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Avatar Group</h3>
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <Avatar.Group max={4}>
              <Avatar src={img1} />
              <Avatar src={img2} />
              <Avatar src={img3} />
              <Avatar type="icon" variant="soft" color="primary" icon={<FiUser />} />
              <Avatar type="letter" name="Amit" variant="outline" color="rose" />
              <Avatar type="letter" name="Kiran" variant="soft" color="emerald" />
            </Avatar.Group>

            <Avatar.Group max={6} size="lg">
              <Avatar src={img2} />
              <Avatar src={img3} />
              <Avatar src={img1} />
              <Avatar type="icon" color="indigo" />
              <Avatar type="letter" name="Pooja" />
              <Avatar type="letter" name="Zara" variant="outline" color="purple" />
              <Avatar type="letter" name="Vikram" variant="soft" color="amber" />
              <Avatar type="letter" name="Kiran" variant="solid" color="emerald" />
            </Avatar.Group>
          </div>
        </Card>

        {/* Solid Rings */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Solid Rings</h3>
          <div className="flex flex-wrap items-center gap-6 mt-4">
            <Avatar src={img4} alt="Kiran" variant="solid" color="rose" className="ring ring-rose-500 ring-offset-2 dark:ring-offset-gray-900" />
            <Avatar src={img2} alt="Anuj" variant="solid" color="indigo" size="lg" className="ring-2 ring-indigo-500 ring-offset-4 ring-offset-gray-950" />
            <Avatar src={img1} alt="Riya" variant="soft" color="emerald" className="ring-4 ring-emerald-500 ring-offset-2" />
          </div>
        </Card>

        {/* Elevated Avatars */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Elevated Avatars</h3>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <Avatar src={img1} elevated />
            <Avatar type="icon" color="warning" elevated />
            <Avatar type="letter" name="Dev" color="rose" elevated />
          </div>
        </Card>

        {/* Mixed Showcase */}
        <Card className="col-span-1 md:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Mixed Showcase</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            <div className="flex items-center gap-3">
              <Avatar src={img1} size="lg" bordered color="primary" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Emma</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Designer</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar type="icon" size="lg" variant="soft" color="emerald" ring="solid" status="online" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Alex</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Developer</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar type="letter" size="lg" name="Sophia" variant="outline" color="rose" ring="gradient" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Sophia</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">PM</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar src={img2} size="lg" rounded="md" status="busy" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">John</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">QA</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar type="icon" size="lg" color="indigo" ring="gradient" elevated />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Daniel</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Support</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar type="letter" size="lg" name="Lucas" bordered color="purple" status="idle" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Lucas</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">HR</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AvatarUi;
