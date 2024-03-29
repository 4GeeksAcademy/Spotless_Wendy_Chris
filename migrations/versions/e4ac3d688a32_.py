"""empty message

Revision ID: e4ac3d688a32
Revises: 06d15fd334d3
Create Date: 2024-03-29 14:44:22.006590

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e4ac3d688a32'
down_revision = '06d15fd334d3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('worker',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.String(length=120), nullable=False),
    sa.Column('img', sa.String(length=300), nullable=True),
    sa.Column('banking_info', sa.String(length=300), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=False),
    sa.Column('ranking', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('address'),
    sa.UniqueConstraint('banking_info'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('full_name'),
    sa.UniqueConstraint('img'),
    sa.UniqueConstraint('phone')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('full_name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('phone', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('img', sa.String(length=300), nullable=True))
        batch_op.add_column(sa.Column('billing', sa.String(length=300), nullable=False))
        batch_op.add_column(sa.Column('address', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['billing'])
        batch_op.create_unique_constraint(None, ['full_name'])
        batch_op.create_unique_constraint(None, ['phone'])
        batch_op.create_unique_constraint(None, ['img'])
        batch_op.create_unique_constraint(None, ['address'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('address')
        batch_op.drop_column('billing')
        batch_op.drop_column('img')
        batch_op.drop_column('phone')
        batch_op.drop_column('full_name')

    op.drop_table('worker')
    # ### end Alembic commands ###
