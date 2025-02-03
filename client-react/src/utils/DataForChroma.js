export function transformForChroma (data) {
    if (data){
    return {
      documents: data?.map(dev => 
        `${dev.name} is a ${dev.role} skilled in ${dev.skills.join(", ")}. They have ${dev.experience} years of experience and are based in ${dev.location}.`
      ),
      metadatas: data?.map(dev => ({
        name: dev.name,
        role: dev.role,
        skills: dev.skills,
        experience: dev.experience,
        location: dev.location,
        email: dev.email,
        linkedin: dev.linkedin
      })),
      ids: data?.map((_, index) => `mem_${index + 1}`)
    } ;
}
  };