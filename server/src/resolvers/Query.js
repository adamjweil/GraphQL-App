async function users(parent, args, context, info) {
  const users = await context.prisma.users()
  return users
}

function user(parent, args, context, info) {
  return context.prisma.user({ id: args.id })
}

function me(parent, args, context, info) {
  return context.prisma.user({ id: parent.id })
}

module.exports = {
  users,
  user,
  me,
}
