import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, checkRateLimit } from '@/lib/api/guards';
import { changeUserName } from '@/lib/api/users';
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from '@/constants/user_name_rules';
import { validateUserName } from '@/utils/validate-user-name';

const NAME_ERROR_MESSAGES = {
  required: 'Name is required',
  spaces: 'Name cannot contain spaces',
  tooShort: `Name must be at least ${MIN_NAME_LENGTH} characters`,
  tooLong: `Name must be at most ${MAX_NAME_LENGTH} characters`,
};

export async function PATCH(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'nameChange');
    if (limitError) return limitError;

    const { name } = await request.json();

    if (typeof name !== 'string') {
      return NextResponse.json({ error: 'Name must be a string' }, { status: 400 });
    }

    const nameError = validateUserName(name);
    if (nameError) {
      return NextResponse.json({ error: NAME_ERROR_MESSAGES[nameError] }, { status: 400 });
    }

    const { error: changeError, user: updated } = await changeUserName(user!.id, name);
    if (changeError) return changeError;

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error('Error changing user name:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
