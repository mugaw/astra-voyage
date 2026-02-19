'use client';

export function SpaceScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* High Quality Unsplash Fallback Image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3872&auto=format&fit=crop')] 
        bg-cover bg-center opacity-60 bg-no-repeat"
      />
      
      {/* Cinematic Ultra-Realistic Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
        poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3872&auto=format&fit=crop"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-spinning-earth-in-the-galaxy-4190-large.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
      </video>
      
      {/* Deep Space Gradient Overlays for UI readability and cosmic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/90 via-transparent to-[#0a0a0f]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/60" />
      
      {/* Starry dust overlay pattern */}
      <div className="absolute inset-0 cosmic-bg opacity-40 mix-blend-screen mix-blend-color-dodge" />
    </div>
  );
}

export default SpaceScene;
