export default function AvatarInitials({ name, size = 40, fontSize = '1rem' }) {
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const words = fullName.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const getColor = (fullName) => {
    const colors = ['#5F7E6D', '#8DAA91', '#4B6456', '#3A5044', '#6E8779'];
    if (!fullName) return colors[0];
    const index = fullName.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: getColor(name),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: fontSize,
        flexShrink: 0,
      }}
    >
      {getInitials(name)}
    </div>
  );
}