function email(parent, args, context, info) {
  return context.prisma.user({ id: parent.id }).email()
}

function createdAt(parent, args, context, indo) {
  return context.prisma.user({ id: args.id }).createdAt()
}

function updatedAt(parent, args, context, indo) {
  return context.prisma.user({ id: args.id }).updatedAt()
}

module.exports = {
  email,
  createdAt,
  updatedAt,
}
