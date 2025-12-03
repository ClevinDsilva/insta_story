import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ViewersListInteractive from './components/ViewersListInteractive';

export const metadata: Metadata = {
  title: 'Story Viewers - Instagram Stories Clone',
  description: 'View the complete list of users who have viewed your Instagram story, including usernames, profile pictures, and view timestamps.'
};

interface Viewer {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  avatarAlt: string;
  viewedAt: string;
}

const mockViewers: Viewer[] = [
{
  id: '1',
  username: 'sarah_johnson',
  fullName: 'Sarah Johnson',
  avatarUrl: "https://images.unsplash.com/photo-1652391584869-0408bf759537",
  avatarAlt: 'Young woman with long brown hair smiling at camera in casual white shirt',
  viewedAt: '2025-11-21T05:50:00.000Z'
},
{
  id: '2',
  username: 'mike_chen',
  fullName: 'Michael Chen',
  avatarUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1deaf0e87-1763296711015.png",
  avatarAlt: 'Asian man with short black hair in blue button-up shirt smiling outdoors',
  viewedAt: '2025-11-21T05:45:00.000Z'
},
{
  id: '3',
  username: 'emma_davis',
  fullName: 'Emma Davis',
  avatarUrl: "https://images.unsplash.com/photo-1625937191333-e523f96aae08",
  avatarAlt: 'Blonde woman with wavy hair in black top looking at camera',
  viewedAt: '2025-11-21T05:40:00.000Z'
},
{
  id: '4',
  username: 'alex_rodriguez',
  fullName: 'Alex Rodriguez',
  avatarUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1b3f70e4c-1763296194637.png",
  avatarAlt: 'Hispanic man with beard in gray hoodie smiling in urban setting',
  viewedAt: '2025-11-21T05:35:00.000Z'
},
{
  id: '5',
  username: 'olivia_martinez',
  fullName: 'Olivia Martinez',
  avatarUrl: "https://images.unsplash.com/photo-1526660289722-89d2a7f6a81f",
  avatarAlt: 'Woman with dark hair in striped shirt smiling warmly at camera',
  viewedAt: '2025-11-21T05:30:00.000Z'
},
{
  id: '6',
  username: 'james_wilson',
  fullName: 'James Wilson',
  avatarUrl: "https://images.unsplash.com/photo-1664026965283-7d208d5acd7d",
  avatarAlt: 'Man with brown beard in plaid shirt looking confidently at camera',
  viewedAt: '2025-11-21T05:25:00.000Z'
},
{
  id: '7',
  username: 'sophia_lee',
  fullName: 'Sophia Lee',
  avatarUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1b90549-1763296301290.png",
  avatarAlt: 'Asian woman with long black hair in white blouse smiling professionally',
  viewedAt: '2025-11-21T05:20:00.000Z'
},
{
  id: '8',
  username: 'daniel_brown',
  fullName: 'Daniel Brown',
  avatarUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_103124391-1763295520525.png",
  avatarAlt: 'Man with short brown hair in casual gray t-shirt outdoors',
  viewedAt: '2025-11-21T05:15:00.000Z'
},
{
  id: '9',
  username: 'ava_garcia',
  fullName: 'Ava Garcia',
  avatarUrl: "https://images.unsplash.com/photo-1654944989824-258e5185885e",
  avatarAlt: 'Woman with curly brown hair in denim jacket smiling brightly',
  viewedAt: '2025-11-21T05:10:00.000Z'
},
{
  id: '10',
  username: 'ryan_taylor',
  fullName: 'Ryan Taylor',
  avatarUrl: "https://images.unsplash.com/photo-1648742468740-6347e05c7faa",
  avatarAlt: 'Young man with styled hair in black shirt looking at camera',
  viewedAt: '2025-11-21T05:05:00.000Z'
},
{
  id: '11',
  username: 'mia_anderson',
  fullName: 'Mia Anderson',
  avatarUrl: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
  avatarAlt: 'Woman with blonde hair in casual attire smiling naturally',
  viewedAt: '2025-11-21T05:00:00.000Z'
},
{
  id: '12',
  username: 'ethan_thomas',
  fullName: 'Ethan Thomas',
  avatarUrl: "https://images.unsplash.com/photo-1492248102810-f0b832a9c79c",
  avatarAlt: 'Man with glasses in blue shirt smiling cheerfully',
  viewedAt: '2025-11-21T04:55:00.000Z'
},
{
  id: '13',
  username: 'isabella_moore',
  fullName: 'Isabella Moore',
  avatarUrl: "https://images.unsplash.com/photo-1652201767820-b33dc3c9e051",
  avatarAlt: 'Woman with red hair in green sweater looking confidently at camera',
  viewedAt: '2025-11-21T04:50:00.000Z'
},
{
  id: '14',
  username: 'noah_jackson',
  fullName: 'Noah Jackson',
  avatarUrl: "https://images.unsplash.com/photo-1601239156071-15ec4c7beff2",
  avatarAlt: 'Man with short hair in white t-shirt smiling outdoors',
  viewedAt: '2025-11-21T04:45:00.000Z'
},
{
  id: '15',
  username: 'charlotte_white',
  fullName: 'Charlotte White',
  avatarUrl: "https://images.unsplash.com/photo-1649059040886-b9126258edf6",
  avatarAlt: 'Woman with dark hair in black top looking elegantly at camera',
  viewedAt: '2025-11-21T04:40:00.000Z'
}];


export default function StoryViewersListPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-14">
        <ViewersListInteractive viewers={mockViewers} totalViews={mockViewers.length} />
      </main>
    </>);

}