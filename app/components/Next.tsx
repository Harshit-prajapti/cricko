'use client'
type NextButtonProps = {
    ownerName: string;
    teamName: string;
    email: string;
    mobile: string;
    tournamentId: string;
}
const NextButton: React.FC<NextButtonProps> = ({ ownerName, teamName, email, mobile, tournamentId }) => {
  const handleClick = () => {
    console.log("Next button clicked");
    console.log("Owner Name:", ownerName);
    console.log("Team Name:", teamName);
    console.log("Email:", email);
    console.log("Mobile:", mobile);
    console.log("Tournament ID:", tournamentId);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Next
    </button>
  );
}
export default NextButton;